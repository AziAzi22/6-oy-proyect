import type { NextFunction, Request, Response } from "express";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { Bot } from "../model/bot.model.js";
import { BotUser } from "../model/bot-user.model.js";
import { Op } from "sequelize";
dotenv.config();

Bot.sync({ force: false });
BotUser.sync({ force: false });

const bot = new TelegramBot(process.env.BOT_TOKEN as string, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatID = msg.chat.id as number;
  const firstName = msg.from?.first_name as string;

  if (msg.text === "/start") {
    const foundedUser = await BotUser.findOne({ where: { chat_id: chatID } });

    if (!foundedUser?.dataValues) {
      await BotUser.create({ full_name: firstName, chat_id: chatID });
      await bot.sendMessage(chatID, "telefon raqam ulashish", {
        reply_markup: {
          keyboard: [
            [{ text: "telefon raqam ulashish", request_contact: true }],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
    } else {
      if (!foundedUser?.dataValues.phone_number) {
        await bot.sendMessage(chatID, "telefon raqam ulashish", {
          reply_markup: {
            keyboard: [
              [{ text: "telefon raqam ulashish", request_contact: true }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        });
      }
      await bot.sendMessage(chatID, "botdan foydalanishingiz mumkun");
    }
  }
});

bot.on("message", async (msg) => {
  const chatID = msg.chat.id as number;

  const foundedUser = await BotUser.findOne({ where: { chat_id: chatID } });

  if (msg.contact) {
    if (foundedUser) {
      await BotUser.update(
        { phone_number: msg.contact?.phone_number },
        { where: { chat_id: chatID } },
      );
    }
  }

  if (msg.text && msg.text !== "/start") {
    await Bot.create({
      full_name: foundedUser?.dataValues.full_name,
      phone_number: foundedUser?.dataValues.phone_number,
      chat_id: chatID,
      message: msg.text,
    });

    bot.sendMessage(chatID, "murojat qabul qilindi");
  }
});

export const getMessageFromToday = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const currentDate = new Date();

    currentDate.setUTCHours(0, 0, 0, 0);

    const messages = await Bot.findAll({
      where: { createdAt: { [Op.gte]: currentDate } },
    });

    res.status(200).json({
      messages,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
