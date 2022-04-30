const getFormElements = () => {
    const decisionContainer = document.querySelector(".decision-container");
    const decisionResult = document.querySelector(".decision-result");
    const buttons = document.querySelector(".buttons");
    const question = document.querySelector(".question-input");
    const questionValue = document.querySelector(".question-input").value;
    const thingToBeDecided = document.querySelector(".thing-to-be-decided");
    const anotherDecision = document.querySelector("#anotherDecision");
    const inputFields = Array.from(document.querySelectorAll("input"));
    const form = document.getElementById("theForm");
    const addOption = document.getElementById("addOption");
    const removeBtns = document.querySelectorAll(".remove");
    const optionInputs = Array.from(document.querySelectorAll(".options"));
    const error = document.querySelector("#error")

    return { error, optionInputs, form, addOption, removeBtns, inputFields, decisionContainer, decisionResult, buttons, question, questionValue, thingToBeDecided, anotherDecision }
}

const removeFunc = (btn) => {
    if (getFormElements().optionInputs.length === 2) {
        getFormElements().error.style.display = "block"
    } else {
        btn.parentNode.parentNode.removeChild(btn.parentNode)
        setOptionPlaceHolderNumbers();
    }
}

const getRandomIndex = (num) => {
    return Math.floor(Math.random() * (num));
}

const optionInputs = () => {
    return Array.from(document.querySelectorAll(".options"));
}

const setOptionPlaceHolderNumbers = () => {
    getFormElements().optionInputs.forEach((inputField, index) => {
        inputField.setAttribute("placeholder", `Option #${index + 1}`)
    })
}

const getOptionsList = () => {
    return document.querySelector(".options-list");
}

const clear = () => {
    getFormElements().anotherDecision.style.display = "none";
    getFormElements().thingToBeDecided.style.display = "none";
    getFormElements().thingToBeDecided.textContent = "";
    getFormElements().question.style.display = "initial";
    getFormElements().questionValue.textContent = "";
    getOptionsList().style.display = "initial";
    getFormElements().buttons.style.display = "flex";
    getFormElements().decisionContainer.style.display = "none";
    getFormElements().decisionResult.textContent = "";
    getFormElements().inputFields.forEach(inputField => inputField.value = "");
}

getFormElements().removeBtns.forEach(btn => btn.addEventListener("click", () => {
    removeFunc(btn);
}))

getFormElements().form.addEventListener("submit", (e) => {
    e.preventDefault();
    getFormElements().error.style.display = "none"
    const options = getFormElements().optionInputs.map(optionInput => optionInput.value)
    const randomIndex = getRandomIndex(options.length);
    getFormElements().anotherDecision.style.display = "flex";
    getFormElements().anotherDecision.addEventListener("click", () => {
        clear();
    })
    getFormElements().thingToBeDecided.style.display = "block";
    getFormElements().thingToBeDecided.textContent = getFormElements().questionValue;
    getFormElements().question.style.display = "none";
    getOptionsList().style.display = "none";
    getFormElements().buttons.style.display = "none";
    getFormElements().decisionContainer.style.display = "block";
    getFormElements().decisionResult.textContent = options[randomIndex];
})

getFormElements().addOption.addEventListener("click", () => {
    getFormElements().error.style.display = "none"
    const div = document.createElement("div");
    const input = document.createElement("input");
    const button = document.createElement("button");
    button.setAttribute("class", "remove");
    button.setAttribute("type", "button");
    button.addEventListener("click", () => {
        removeFunc(button);
    });
    button.textContent = "X"
    input.setAttribute("class", "options");
    input.required = true;
    input.setAttribute("placeholder", `Option #${getFormElements().optionInputs.length + 1}`)
    getOptionsList().append(div);
    div.append(input)
    div.append(button)
})




