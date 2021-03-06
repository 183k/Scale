const bot = require("../../Bot.js");
const Bot = new bot();
const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports = class extends bot {
    /**
     * @param  {object} message message object
     */
    constructor(message) {
        super();
        this.message = message;
        this._run = () => {
            try {
                if(this.message.content.split(" ").length != 3 && this.message.attachments.size == 0) return this.message.reply("syntax: `:bright <value between -1 and 1> <url>`");
                Jimp.read(this.message.content.split(" ").slice(2).join(" ") || this.message.attachments.first().url).then(buffer => {
                    buffer.brightness(Number(this.message.content.split(" ")[1]))
                    buffer.getBuffer(Jimp.MIME_PNG, sendBuffer)
                }).catch(console.error);
                function sendBuffer(err, buff){
                    message.channel.send("Requested by: " + message.author.tag,new Discord.Attachment(buff, "bright.png")).catch(console.error);
                }
            } catch (e) {
            }
        }
    }
    /**
     * @param  {function} fn Function
     */
    set runFN(fn) {
        this._run = fn;
    }
    run() {
        if (this.commands["image-manipulation"].bright.status) {
            this._run(this.message);
        }
    }
}
