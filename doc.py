import os
from fnmatch import fnmatch

root = os.path.abspath(os.getcwd())

file_paths = []
for path, subdirs, files in os.walk(root):
    for name in files:
        if name.endswith(('.py', 'jsx', 'js')):
            current_path = os.path.join(path, name)
            file_paths.append(current_path)


open('doc_code.txt', 'w').close()
doc = open('doc_code.txt', 'w+')

for path in file_paths:
    f = open(path, "r")
    current = f.read()
    doc.write(current)

