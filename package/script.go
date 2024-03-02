package main

import (
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"strings"
	// "path/filepath"
	// "io/ioutil"
    // "github.com/joho/godotenv"
)

// func printStringCharacters(s string) {
// 	for _, ch := range s {
// 		fmt.Printf("%c ", ch)
// 	}
// 	fmt.Println()
// }

func main() {
// 	err := godotenv.Load(".env")
// if err != nil {
//         log.Fatalf("Error loading environment variables file")
//     }
	// Specify the file path present in the PAYLOAD_CONFIG_PATH variable
	// payloadConfigPath := os.Getenv("PAYLOAD_CONFIG_PATH")
	
	cmd := exec.Command("bash","./package/getenv.sh")
    output, err := cmd.CombinedOutput()
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Output:", string(output))

	cmd2 := exec.Command("node","./package/test.js")
	cmd2.Stdin = strings.NewReader(string(output))
	fmt.Println("Input:", cmd2.Stdin)
    output1, err1 := cmd2.CombinedOutput()
    if err1 != nil {
        fmt.Println("Error:", err1)
        return
    }
    fmt.Println("Output2:", string(output1))
	fmt.Println("Output3:", cmd2)

	// file1, err1 := os.Open("test.js")
	// if err1 != nil {
	// 	fmt.Println("Error opening file:", err)
	// 	return
	// }
	// defer file1.Close()


	payloadConfigPath := strings.TrimSpace(string(output1))
	// payloadConfigPath := "C:\\Projects\\npm-test\\npm-test\\payload\\payload.config.ts"
	// payloadConfigPath := "C:/Projects/npm-test/npm-test/payload/payload.config.ts"
	
	// payloadConfigPath := "C:/Projects/npm-test/npm-test/payload/payload.config.ts"

	// if strings.TrimSpace(string(output1)) == payloadConfigPath {
	// 	fmt.Println("Strings are equal")
	// } else {
	// 	fmt.Println("Strings are not equal")
	// }

	// fmt.Println("Shell:", os.Getenv("PAYLOAD_CONFIG_PATH"))


	file, err := os.Open(payloadConfigPath)
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		if strings.Contains(line, `"../collections/user"`) {
			continue
		}
		if strings.Contains(line, "collections:[") || strings.Contains(line, "collections: [") {
			var idx int
			if strings.Contains(line, "collections:[") {
				idx = strings.Index(line, ":[")
			} else {
				idx = strings.Index(line, ": [")
			}
			if idx != -1 {
				line = line[:idx+3] + "user," + line[idx+3:]
			}
			
			lines = append(lines, line)
			continue
		}

		lines = append(lines, line)

	}

	if err := scanner.Err(); err != nil {
		fmt.Println("Error scanning file:", err)
		return
	}

	lines = append([]string{"import user from \"../collections/user\";"}, lines...)

	updatedFile, err := os.Create(payloadConfigPath)
	if err != nil {
		fmt.Println("Error creating updated file:", err)
		return
	}
	defer updatedFile.Close()

	for _, line := range lines {
		_, err := updatedFile.WriteString(line + "\n")
		if err != nil {
			fmt.Println("Error writing to updated file:", err)
			return
		}
	}

	fmt.Println("User imported and added to collections array successfully.")
	cmd3 := exec.Command("node","./package/seed/index.js")
	cmd3.Stdin = strings.NewReader(string(output1))
	// fmt.Println("Input:", cmd3.Stdin)
    output2, err2 := cmd3.CombinedOutput()
    if err2 != nil {
        fmt.Println("Error:", err2)
        return
    }
    fmt.Println("Output2+:", string(output2))
}
