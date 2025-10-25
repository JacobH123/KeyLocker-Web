
/**
 * Derive a symmetric vault key from the user's master password.
 * Uses PBKDF2 with user-specific salt (user ID).
 */
export async function deriveVaultKey(masterPassword, userId) {
  const salt = new TextEncoder().encode(`user-${userId}-salt`);
  
  // Import password as key material
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(masterPassword),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );
  
  // Derive AES key using PBKDF2
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000, 
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,  // Changed to true - key is extractable
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypt plaintext using AES-GCM
 */
export async function encryptVaultItem(vaultKey, plaintext) {
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 12-byte random IV
  const encoded = new TextEncoder().encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    vaultKey,
    encoded
  );

  return {
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
    iv: btoa(String.fromCharCode(...iv))
  };
}

/**
 * Decrypt AES-GCM encrypted ciphertext
 */
export async function decryptVaultItem(vaultKey, ciphertextBase64, ivBase64) {
  const ciphertext = Uint8Array.from(atob(ciphertextBase64), c => c.charCodeAt(0));
  const iv = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0));

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    vaultKey,
    ciphertext
  );

  return new TextDecoder().decode(decrypted);
}

/**
 * Hash a password for authentication using PBKDF2
 */
export async function hashPasswordForLogin(password, userEmail) {
  const salt = new TextEncoder().encode(`auth-${userEmail}`);
  
  // Import password as key material
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  
  // Derive hash using PBKDF2
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    256 // 256 bits = 32 bytes
  );
  
  // Convert to base64 for transmission
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Serialize CryptoKey for storage
 */
export async function serializeVaultKey(vaultKey) {
  const exported = await crypto.subtle.exportKey("raw", vaultKey);
  return btoa(String.fromCharCode(...new Uint8Array(exported)));
}

/**
 * Deserialize CryptoKey from storage
 */
export async function deserializeVaultKey(serializedKey) {
  const keyData = Uint8Array.from(atob(serializedKey), c => c.charCodeAt(0));
  return crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "AES-GCM" },
    true,  //Changed to true - key is extractable
    ["encrypt", "decrypt"]
  );
}