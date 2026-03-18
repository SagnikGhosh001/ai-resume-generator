import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  apiKey: Deno.env.get("OPEN_ROUTER_API_KEY"),
});

export const callOpenRouter = async (messages, tools) => {
  const res = await openRouter.chat.send({
    chatGenerationParams: {
      model: "stepfun/step-3.5-flash:free",
      messages,
      tools,
      stream: false,
    },
  });

  return res.choices[0].message;
};
