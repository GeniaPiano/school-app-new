"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRecord = void 0;
const db_1 = require("../utils/db");
const errors_1 = require("../utils/errors");
const uuid_1 = require("uuid");
class MessageRecord {
    constructor(obj) {
        if (!obj.headline || obj.headline.length < 4 || obj.headline.length > 40) {
            throw new errors_1.ValidationError('Headline should contain from 4 to 40 characters');
        }
        if (!obj.content || obj.content.length < 30 || obj.content.length >= 500) {
            throw new errors_1.ValidationError('Content should contain from 30 to 500 characters');
        }
        this.id = obj.id;
        this.author_id = obj.author_id;
        this.author_name = obj.author_name;
        this.headline = obj.headline;
        this.content = obj.content;
        this.createdAt = new Date();
    }
    insert(author_id, author_name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                this.id = (0, uuid_1.v4)();
            }
            db_1.pool.execute("INSERT INTO `messages`(`id`, `author_id`, `author_name`, `headline`, `content`,  `createdAt`) VALUES(:id, :author_id, :author_name, :headline, :content, :createdAt)", {
                id: this.id
            });
        });
    }
}
exports.MessageRecord = MessageRecord;
//# sourceMappingURL=message.record.js.map