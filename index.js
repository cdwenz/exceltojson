const XLSX = require('xlsx');

const ExcelToJson = () => {
    const excel = XLSX.readFile("C:/Users/cdw_0/repos/exceltojson/plantillaAmuri_bebe.xlsx");
    const nombreHoja = excel.SheetNames; // Array de nombres de hojas
    let element = {};

    for (let i = 0; i < nombreHoja.length; i++) {
        const hoja = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[i]]);
        // Procesamos cada fila de la hoja
        element[nombreHoja[i]] = hoja.map((fila) => {
            // Verificamos si la columna 'img' existe y está separada por comas
            if (fila.img) {
                // Dividimos el string de 'img' en un array
                fila.img = fila.img.split(",").map(url => url.trim());
            }
            if (fila.size) {
                // Dividimos el string de 'size' en un array
                fila.size = fila.size.split(",").map(size => size.trim());
            }
            return fila;
        });
    }

    return element;
}

console.log(JSON.stringify(ExcelToJson(), null, 2));

// console.log(ExcelToJson())