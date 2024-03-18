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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
var cors = require('cors');
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(cors());
app.use(body_parser_1.default.json());
app.post("/insertUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, codeLanguage, stdin } = req.body;
    try {
        const insertedUser = yield insertUser(username, codeLanguage, stdin);
        res.json({ success: true, data: insertedUser });
    }
    catch (error) {
        console.log("error inserting user");
        res.status(500).json({ success: false, error: "error inserting data" });
    }
}));
function insertUser(username, codeLanguage, stdin) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.codeEntries.create({
            data: {
                username,
                codeLanguage,
                stdin
            }
        });
        console.log(res);
        return res;
    });
}
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
