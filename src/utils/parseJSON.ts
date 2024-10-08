export default function parseJSONString(jsonString: string): Record<string, any> {
    jsonString = jsonString.trim();

    function parseValue(value: string): string | number {
        if (value.startsWith('"') && value.endsWith('"')) {
            return value.slice(1, -1);
        }
        
        const numberValue = Number(value);
        if (!isNaN(numberValue)) {
            return numberValue;
        }

        return value; 
    }

    const regex = /"([^"]+)":\s*([^,:{}]+)/g;
    const result: Record<string, any> = {};

    let match: RegExpExecArray | null;
    while ((match = regex.exec(jsonString)) !== null) {
        const key = match[1];
        const value = match[2].trim(); 
        result[key] = parseValue(value); 
    }

    const nestedRegex = /"([^"]+)":\s*({[^}]+})/g;
    let nestedMatch: RegExpExecArray | null;
    while ((nestedMatch = nestedRegex.exec(jsonString)) !== null) {
        const key = nestedMatch[1]; 
        const nestedValue = nestedMatch[2].trim();
        result[key] = parseJSONString(nestedValue);
    }

    return result;
}
