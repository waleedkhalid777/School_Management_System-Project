import inquirer from "inquirer";
const randomNumber = Math.floor(10000 + Math.random() * 90000);
let myBalance = 0;
async function main() {
    let answer = await inquirer.prompt([
        {
            name: "student",
            type: "input",
            message: "Enter student name",
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please enter a non-empty value.";
            }
        },
        {
            name: "courses",
            type: "list",
            message: "Select the course to enroll",
            choices: ["MS.office", "HTML", "Javascript", "Typescript", "Python"]
        }
    ]);
    const tuitionFees = {
        "MS.office": 2000,
        "HTML": 2000,
        "Javascript": 5000,
        "Typescript": 6000,
        "Python": 10000
    };
    console.log(`\nTuition Fees: ${tuitionFees[answer.courses]}/-\n`);
    console.log(`Balance: ${myBalance}\n`);
    let paymentMethod = await inquirer.prompt([
        {
            name: "payment",
            type: "list",
            message: "Select payment method",
            choices: ["Easypaisa", "Bank transfer", "JazzCash"]
        },
        {
            name: "amount",
            type: "input",
            message: "Enter amount to transfer:",
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please enter a non-empty value.";
            }
        }
    ]);
    console.log(`\nYou selected payment method ${paymentMethod.payment}`);
    console.log(answer.courses);
    console.log(paymentMethod.payment);
    const tuitionFee = tuitionFees[answer.courses];
    const paymentAmount = parseFloat(paymentMethod.amount);
    if (tuitionFee === paymentAmount) {
        console.log(`Congratulations! You have successfully enrolled in ${answer.courses}.\n`);
        let ans = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: "What would you like to do next?",
                choices: ["View status", "Exit"]
            }
        ]);
        if (ans.select === "View status") {
            console.log("\n********Status*******\n");
            console.log(`Student Name: ${answer.student}`);
            console.log(`Student ID: ${randomNumber}`);
            console.log(`Course: ${answer.courses}`);
            console.log(`Tuition fees paid: ${paymentAmount}`);
            console.log(`Balance: ${myBalance += paymentAmount}`);
        }
        else {
            console.log("\nExiting student Management System\n");
        }
    }
    else {
        console.log("Invalid amount due to course.\n");
    }
}
main();
