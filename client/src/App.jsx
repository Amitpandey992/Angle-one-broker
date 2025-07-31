import { useEffect, useRef } from "react";
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Zap,
    ChevronDown,
} from "lucide-react";
import { Bounce, toast } from "react-toastify";
// import { base_url, webhook_url } from "./utils/baseUrl";
// import axios from "axios";

function App() {
    const ref = useRef();
    // const [priceForBuy, setPriceForBuy] = useState("");
    // const [priceForSell, setPriceForSell] = useState("");
    // const [priceForWebhook, setPriceForWebhook] = useState("");
    // const [isSubmittingBuy, setIsSubmittingBuy] = useState(false);
    // const [isSubmittingSell, setIsSubmittingSell] = useState(false);
    // const [isSubmittingWebhook, setIsSubmittingWebhook] = useState(false);
    // const [selectedAction, setSelectedAction] = useState("");

    // const placeOrderBuy = async () => {
    //     if (!priceForBuy) return;

    //     setIsSubmittingBuy(true);
    //     try {
    //         const response = await axios.post(`${base_url}/buy`, {
    //             price: Number(priceForBuy),
    //             type: "BUY",
    //         });
    //         console.log(response.data);

    //         await new Promise((resolve) => setTimeout(resolve, 1000));
    //         console.log("Buy order placed:", { priceForBuy, type: "BUY" });
    //         setPriceForBuy("");
    //     } catch (error) {
    //         console.error("Buy order failed:", error);
    //     } finally {
    //         setIsSubmittingBuy(false);
    //     }
    // };

    // const placeOrderSell = async () => {
    //     if (!priceForSell) return;

    //     setIsSubmittingSell(true);
    //     try {
    //         const response = await axios.post(`${base_url}/sell`, {
    //             price: Number(priceForSell),
    //             type: "SELL",
    //         });
    //         console.log(response.data);

    //         await new Promise((resolve) => setTimeout(resolve, 1000));
    //         console.log("Sell order placed:", { priceForSell, type: "SELL" });
    //         setPriceForSell("");
    //     } catch (error) {
    //         console.error("Sell order failed:", error);
    //     } finally {
    //         setIsSubmittingSell(false);
    //     }
    // };

    // const placeOrderWebhook = async () => {
    //     if (!priceForWebhook) return;
    //     setIsSubmittingWebhook(true);

    //     try {
    //         const parsedUrl = JSON.parse(localStorage.getItem("url"));
    //         const response = await axios.post(
    //             `${parsedUrl}/webhook`,
    //             {
    //                 symbol: "SBIN-EQ",
    //                 action: selectedAction,
    //                 price: Number(priceForWebhook),
    //             },
    //             {
    //                 headers: {
    //                     "ngrok-skip-browser-warning": "true",
    //                 },
    //             }
    //         );
    //         console.log(response.data);

    //         await new Promise((resolve) => setTimeout(resolve, 1000));
    //         console.log("order placed:", { priceForWebhook, type: "SELL" });
    //         setPriceForWebhook("");
    //     } catch (error) {
    //         console.error("webhook order failed:", error);
    //     } finally {
    //         setIsSubmittingWebhook(false);
    //     }
    // };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/ngrok-url`)
            .then((res) => res.json())
            .then((data) => {
                console.log("⚡ Got ngrok URL:", data.url);

                localStorage.setItem("url", data.url);
            })
            .catch((err) => console.error("Failed to fetch ngrok URL", err));
    }, []);

    console.log("ngrok updated url", localStorage.getItem("url"));
    const webhook_url = localStorage.getItem("url");

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                            <Zap className="w-12 h-12 text-green-400 animate-pulse" />
                            <div className="absolute inset-0 w-12 h-12 bg-green-400/20 rounded-full blur-lg"></div>
                        </div>
                    </div>
                    <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-green-200 to-green-400 mb-4 tracking-tight">
                        TRADING<span className="text-green-400">HUB</span>
                    </h1>
                    <p className="text-xl text-gray-300 font-light tracking-wide">
                        Execute trades with precision and style
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="flex justify-center max-w-4xl mx-auto">
                    <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400/50 to-green-500/50 rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition-opacity duration-500"></div>

                        <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 shadow-2xl group-hover:border-green-500/30 transition-all duration-500">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <TrendingDown className="w-8 h-8 text-green-400" />
                                        <div className="absolute inset-0 w-8 h-8 bg-green-400/20 rounded-full blur-md"></div>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight">
                                        Web-Hook
                                    </h2>
                                </div>
                                {/* <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                                    <span className="text-green-400 font-semibold text-sm">
                                        SHORT
                                    </span>
                                </div> */}
                            </div>

                            <div className="space-y-6">
                                {/* <div className="relative">
                                    <div className="relative space-y-3">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                            <TrendingUp className="h-5 w-5 text-green-400" />
                                        </div>
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
                                            <ChevronDown className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            value={selectedAction}
                                            onChange={(e) =>
                                                setSelectedAction(
                                                    e.target.value
                                                )
                                            }
                                            className="w-full pl-12 pr-12 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white text-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer"
                                        >
                                            <option
                                                value=""
                                                className="bg-gray-900 text-white"
                                                disabled
                                            >
                                                Select Action
                                            </option>
                                            <option
                                                value="BUY"
                                                className="bg-gray-900 text-white"
                                            >
                                                BUY
                                            </option>
                                            <option
                                                value="SELL"
                                                className="bg-gray-900 text-white"
                                            >
                                                SELL
                                            </option>
                                        </select>
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <DollarSign className="h-5 w-5 text-green-400" />
                                        </div>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={priceForWebhook}
                                            onWheel={(e) => e.target.blur()}
                                            onChange={(e) =>
                                                setPriceForWebhook(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter price..."
                                            className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white text-lg font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 backdrop-blur-sm"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    </div>

                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 via-green-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                </div> */}

                                {/* <button
                                    onClick={placeOrderWebhook}
                                    disabled={
                                        isSubmittingWebhook || !priceForWebhook
                                    }
                                    className="w-full relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-4 px-8 rounded-xl shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    <span className="relative z-10 text-lg tracking-wide">
                                        {isSubmittingWebhook
                                            ? "PROCESSING..."
                                            : "EXECUTE ORDER"}
                                    </span>
                                </button> */}

                                <input
                                    ref={ref}
                                    type="text"
                                    value={webhook_url}
                                    className="border-green-300 rounded-2xl text-white p-6 w-full border-2   "
                                />

                                <button
                                    // onClick={placeOrderWebhook}
                                    // disabled={
                                    //     isSubmittingWebhook || !priceForWebhook
                                    // }

                                    className="w-full relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-4 px-8 rounded-xl shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group cursor-pointer"
                                >
                                    {/* <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div> */}
                                    <button
                                        className="relative z-10 text-lg tracking-wide cursor-pointer"
                                        onClick={() => {
                                            if (ref.current) {
                                                navigator.clipboard.writeText(
                                                    ref.current.value
                                                );
                                                toast.info(
                                                    "webhook url copied to clipboard",
                                                    {
                                                        position: "top-right",
                                                        autoClose: 5000,
                                                        hideProgressBar: false,
                                                        closeOnClick: false,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                        theme: "dark",
                                                        transition: Bounce,
                                                    }
                                                );
                                            }
                                        }}
                                    >
                                        Copy Webhook URL
                                    </button>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-16">
                    <p className="text-gray-500 text-sm tracking-wider">
                        POWERED BY ADVANCED TRADING ALGORITHMS
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;
