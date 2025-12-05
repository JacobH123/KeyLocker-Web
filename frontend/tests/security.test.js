import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Security Checks', () => {
  test('should not have hardcoded API keys in source files', () => {
    const srcDir = path.join(__dirname, '..', 'src');
    
    if (!fs.existsSync(srcDir)) return;
    
    const apiKeyPatterns = [
      /api[_-]?key\s*=\s*['"][a-zA-Z0-9]{20,}['"]/gi,
      /secret[_-]?key\s*=\s*['"][a-zA-Z0-9]{20,}['"]/gi,
      /password\s*=\s*['"][^'"]{8,}['"]/gi,
      /VITE_[A-Z_]+\s*=\s*['"][a-zA-Z0-9]{20,}['"]/gi
    ];
    
    const checkFile = (filePath) => {
      const content = fs.readFileSync(filePath, 'utf8');
      apiKeyPatterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches) {
          throw new Error(`Potential hardcoded secret found in ${filePath}: ${matches[0]}`);
        }
      });
    };
    
    const walkDir = (dir) => {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
          walkDir(filePath);
        } else if (file.match(/\.(js|jsx|ts|tsx)$/)) {
          checkFile(filePath);
        }
      });
    };
    
    walkDir(srcDir);
  });

  test('should use import.meta.env for environment variables', () => {
    const srcDir = path.join(__dirname, '..', 'src');
    if (!fs.existsSync(srcDir)) return;

    const checkFile = (filePath) => {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('process.env.')) {
        throw new Error(`Found process.env in ${filePath}. Use import.meta.env instead for Vite.`);
      }
    };

    const walkDir = (dir) => {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
          walkDir(filePath);
        } else if (file.match(/\.(js|jsx|ts|tsx)$/)) {
          checkFile(filePath);
        }
      });
    };

    walkDir(srcDir);
  });
});