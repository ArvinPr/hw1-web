class FormulaCalculator {
    constructor() {
        this.formulaElements = document.querySelectorAll('formula');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.evaluateAllFormulas();
    }

    evaluateFormula(formulaElement) {
        const formula = formulaElement.getAttribute('evaluator');
        try {
            const result = this.calculateFormula(formula);
            formulaElement.textContent = result;
        } catch (error) {
            formulaElement.textContent = 'Invalid Formula';
        }
    }

    calculateFormula(formula) {
        const variables = formula.match(/[a-zA-Z]+/g) || [];
        let expression = formula;
        
        variables.forEach(varName => {
            const inputElement = document.getElementById(varName);
            const value = inputElement ? parseFloat(inputElement.value) || 0 : 0;
            expression = expression.replace(new RegExp(varName, 'g'), value);
        });

        return eval(expression).toFixed(2);
    }

    evaluateAllFormulas() {
        this.formulaElements.forEach(formula => {
            this.evaluateFormula(formula);
        });
    }

    setupEventListeners() {
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('input', () => {
                this.evaluateAllFormulas();
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FormulaCalculator();
});