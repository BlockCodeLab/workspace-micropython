const defaultCode = `# hello world!
import machine

print("hello world!")
`;

export default {
  fileList: [
    {
      id: 'main',
      name: 'main.py',
      type: 'text/x-python',
      content: defaultCode,
    },
    {
      id: 'test',
      name: 'test.py',
      type: 'text/x-python',
      content: 'print("test")',
    },
  ],
};
