"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const http_1 = tslib_1.__importDefault(require("http"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const Order_1 = tslib_1.__importDefault(require("./models/Order"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3333;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (request, response) => {
    response.json({ ok: true });
});
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://waiter-robot-display.herokuapp.com',
        ],
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    socket.on('save_order', (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Order_1.default.create(data);
            socket.broadcast.emit('confirmation', data);
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on('load_orders', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const orders = yield Order_1.default.find();
            socket.emit('orders_list', orders);
        }
        catch (error) {
            console.log(error);
        }
    }));
});
mongoose_1.default.connect(process.env.MONGO_URL);
mongoose_1.default.connection.once('open', () => {
    console.log(`>>> MongoDB connection: OK`);
});
server.listen(PORT, () => {
    console.log(`>>> Listening on PORT: ${PORT}`);
});
//# sourceMappingURL=index.js.map