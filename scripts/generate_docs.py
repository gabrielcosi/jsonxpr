#!/usr/bin/env python3

import os
import re

class OperationDocsGenerator:
    def __init__(self, operations_dir: str, output_file: str):
        self.operations_dir = operations_dir
        self.output_file = output_file

    def parse_file(self, content: str):
        """Extract operation names and their implementation line numbers."""
        operations = []
        lines = content.split('\n')
        
        for line_num, line in enumerate(lines, 1):
            match = re.search(r'(\$\w+)\s*\(args:', line)
            if match:
                operator = match.group(1)
                doc_start = self.find_doc_start(lines[:line_num-1])
                if doc_start:
                    operations.append((operator, doc_start))
                else:
                    operations.append((operator, line_num))
        return sorted(operations)

    def find_doc_start(self, lines):
        """Find the start line of the documentation block."""
        for i in range(len(lines) - 1, -1, -1):
            if '/**' in lines[i]:
                return i + 1
            elif not lines[i].strip() or '*/' in lines[i] or '*' in lines[i]:
                continue
            else:
                break
        return None

    def generate_docs(self):
        """Generate the documentation."""
        with open(self.output_file, 'w', encoding='utf-8') as f:
            f.write("# Available Operations\n\n")
            
            for filename in sorted(os.listdir(self.operations_dir)):
                if not filename.endswith('.ts') or '.test.' in filename:
                    continue
                    
                filepath = os.path.join(self.operations_dir, filename)
                category = filename.replace('.ts', '').capitalize()
                
                with open(filepath, 'r', encoding='utf-8') as source_file:
                    content = source_file.read()
                
                operations = self.parse_file(content)
                if not operations:
                    continue
                
                f.write(f"## {category} Operations\n\n")
                f.write("| Operator | Source |\n")
                f.write("|----------|--------|\n")
                
                for operator, line_num in operations:
                    source_link = f"[source](src/operations/{filename}#L{line_num})"
                    f.write(f"| `{operator}` | {source_link} |\n")
                
                f.write("\n")

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    operations_dir = os.path.join(os.path.dirname(script_dir), "src", "operations")
    output_file = os.path.join(os.path.dirname(script_dir), "docs/operations.md")
    
    generator = OperationDocsGenerator(operations_dir, output_file)
    generator.generate_docs()
    print(f"Documentation generated in {generator.output_file}")

if __name__ == "__main__":
    main()
