// utils/getFinancialAdvice.js
import Groq from "groq-sdk"; // Import the Groq SDK

// Initialize Groq with your API key
const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
});

// Function to generate personalized financial advice
const getFinancialAdvice = async (totalBudget, totalSpend) => {
    console.log(totalBudget, totalSpend);
    try {
        const userPrompt = `
      Based on the following financial data:
      - Budget: NRs. ${totalBudget}
      - Expenses: NRs. ${totalSpend}
      Note that the Budgets are allocated for the expenses. The Budgets donot specify my Income.
      Provide detailed financial advice in 2 sentences to help the user manage their finances more effectively.
      Give answer such that you are talking to the user.
      Donot add any prefix like "Based on ..." infront of the answer.
    `;

        // Send the prompt to the Groq API using LLaMA3
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            model: "llama3-8b-8192", // Specify the LLaMA3 model you wanna use
        });

        // Process and return the response
        const advice = chatCompletion.choices[0]?.message?.content;
        console.log(advice);
        return advice;
    } catch (error) {
        console.error("Error fetching financial advice:", error);
        return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
    }
};

export default getFinancialAdvice;
