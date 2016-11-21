import sys

args = sys.argv
file_name = args[1]
with open(file_name, 'r') as f:
	data = f.read()


uppercase = [chr(i) for i in range(65, 91)]
result = str()
for letter in data:
	if letter == '.':
		result += letter + '\n'
	elif letter in uppercase:
		result += '\n' + letter
	else:
		result += letter

with open('result.txt', 'w') as f:
	f.write(result)

print('Done')