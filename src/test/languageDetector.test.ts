import * as assert from 'assert';
import { detectLanguage } from '../utils/languageDetector';

suite('Language Detector Test Suite', () => {

    test('Should detect Python code', () => {
        const pythonCode = `
def hello_world():
    print("Hello, World!")
    return None

class MyClass:
    def __init__(self):
        self.value = 42
`;
        const result = detectLanguage(pythonCode);
        assert.strictEqual(result, 'python');
    });

    test('Should detect JavaScript code', () => {
        const jsCode = `
function helloWorld() {
    console.log("Hello, World!");
    return true;
}

const myVar = () => {
    let x = 10;
    var y = 20;
};
`;
        const result = detectLanguage(jsCode);
        assert.strictEqual(result, 'javascript');
    });

    test('Should detect TypeScript code', () => {
        const tsCode = `
interface User {
    name: string;
    age: number;
}

type ID = string | number;

function greet(user: User): void {
    console.log("Hello " + user.name);
}
`;
        const result = detectLanguage(tsCode);
        assert.strictEqual(result, 'typescript');
    });

    test('Should detect Java code', () => {
        const javaCode = `
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
    
    @Override
    public String toString() {
        return "HelloWorld";
    }
}
`;
        const result = detectLanguage(javaCode);
        assert.strictEqual(result, 'java');
    });

    test('Should detect C++ code', () => {
        const cppCode = `
#include <iostream>
#include <vector>

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::vector<int> nums;
    return 0;
}
`;
        const result = detectLanguage(cppCode);
        assert.strictEqual(result, 'cpp');
    });

    test('Should detect Go code', () => {
        const goCode = `
package main

import "fmt"

func main() {
    message := "Hello, World!"
    fmt.Println(message)
    go doSomething()
}
`;
        const result = detectLanguage(goCode);
        assert.strictEqual(result, 'go');
    });

    test('Should detect Rust code', () => {
        const rustCode = `
fn main() {
    let mut x = 5;
    println!("x = {}", x);
}

impl MyTrait for MyStruct {
    fn my_method(&self) -> i32 {
        42
    }
}
`;
        const result = detectLanguage(rustCode);
        assert.strictEqual(result, 'rust');
    });

    test('Should detect Ruby code', () => {
        const rubyCode = `
class Person
    attr_accessor :name, :age
    
    def initialize(name, age)
        @name = name
        @age = age
    end
    
    def greet
        puts "Hello, my name is #{@name}"
    end
end
`;
        const result = detectLanguage(rubyCode);
        assert.strictEqual(result, 'ruby');
    });

    test('Should detect PHP code', () => {
        const phpCode = `
<?php
function greet($name) {
    echo "Hello, " . $name;
}

class User {
    private $username;
    
    public function __construct($username) {
        $this->username = $username;
    }
}
?>
`;
        const result = detectLanguage(phpCode);
        assert.strictEqual(result, 'php');
    });

    test('Should detect Bash code', () => {
        const bashCode = `
#!/bin/bash

if [ -f "$1" ]; then
    echo "File exists"
fi

export PATH="/usr/local/bin:$PATH"
`;
        const result = detectLanguage(bashCode);
        assert.strictEqual(result, 'bash');
    });

    test('Should detect HTML code', () => {
        const htmlCode = `
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <div class="container">
        <h1>Hello World</h1>
    </div>
</body>
</html>
`;
        const result = detectLanguage(htmlCode);
        assert.strictEqual(result, 'html');
    });

    test('Should detect CSS code', () => {
        const cssCode = `
.container {
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    margin: 0 auto;
}

#main-header {
    color: red;
    padding: 20px;
}
`;
        const result = detectLanguage(cssCode);
        assert.strictEqual(result, 'css');
    });

    test('Should detect JSON code', () => {
        const jsonCode = `
{
    "name": "John Doe",
    "age": 30,
    "active": true,
    "address": null,
    "hobbies": ["reading", "coding"]
}
`;
        const result = detectLanguage(jsonCode);
        assert.strictEqual(result, 'json');
    });

    test('Should detect SQL code', () => {
        const sqlCode = `
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.total > 100;

INSERT INTO users (name, email) VALUES ('John', 'john@example.com');
`;
        const result = detectLanguage(sqlCode);
        assert.strictEqual(result, 'sql');
    });

    test('Should return null for empty input', () => {
        const result = detectLanguage('');
        assert.strictEqual(result, null);
    });

    test('Should return null for plain text', () => {
        const plainText = 'This is just some regular text without any code.';
        const result = detectLanguage(plainText);
        assert.strictEqual(result, null);
    });

    test('Should return null for ambiguous content', () => {
        const ambiguous = 'x = 5';
        const result = detectLanguage(ambiguous);
        // This could be many languages, so it should return null
        assert.strictEqual(result, null);
    });

    test('Should handle mixed content conservatively', () => {
        // When content could be multiple languages, should be conservative
        const mixed = `
        const x = 5;
        def hello():
            pass
        `;
        // This test may pass or fail depending on which has more weight
        // The important thing is it doesn't crash
        const result = detectLanguage(mixed);
        assert.ok(result === null || typeof result === 'string');
    });
});
