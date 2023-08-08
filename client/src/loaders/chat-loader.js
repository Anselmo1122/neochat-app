import url from "../utils/url";

export const loader = async ({ params }) => {
  const res = await fetch(url + "chat/" + params.chatId);
  const { chat } = await res.json();

  return { chat };
}