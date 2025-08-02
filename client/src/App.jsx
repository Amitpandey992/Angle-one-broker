import { useEffect, useRef, useState } from "react";
import { TrendingDown, Zap, Check, Copy } from "lucide-react";

function App() {
    const ref = useRef();
    const [loading, setLoading] = useState(false);
    const [copyStatus, setCopyStatus] = useState("idle");

    async function fetchWebhookUrl() {
        setLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/ngrok-url`
            );
            const data = await response.json();
            console.log("⚡ Got ngrok URL:", data.url);
            localStorage.setItem("url", data.url);
        } catch (error) {
            console.error("Failed to fetch ngrok URL", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWebhookUrl();
    }, []);

    const handleCopyToClipboard = async () => {
        if (ref.current && ref.current.value) {
            setCopyStatus("copying");

            try {
                await navigator.clipboard.writeText(ref.current.value);
                setCopyStatus("copied");

                setTimeout(() => {
                    setCopyStatus("idle");
                }, 2000);
            } catch (error) {
                console.error("Failed to copy to clipboard:", error);
                setCopyStatus("idle");
            }
        }
    };

    console.log("ngrok updated url", localStorage.getItem("url"));
    const webhook_url = localStorage.getItem("url");

    if (loading) {
        return (
            <div className="bg-black w-full h-[100vh] flex justify-center items-center text-4xl text-green-600 ">
                Loading...
            </div>
        );
    }

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
                            </div>

                            <div className="space-y-6">
                                <div className="relative">
                                    <input
                                        ref={ref}
                                        type="text"
                                        value={webhook_url || ""}
                                        readOnly
                                        className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl text-white text-lg font-medium px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 backdrop-blur-sm"
                                        placeholder="Webhook URL will appear here..."
                                    />
                                </div>

                                <button
                                    onClick={handleCopyToClipboard}
                                    disabled={
                                        !webhook_url || copyStatus === "copying"
                                    }
                                    className={`w-full relative overflow-hidden font-bold py-4 px-8 rounded-xl shadow-2xl transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group ${
                                        copyStatus === "copied"
                                            ? "bg-gradient-to-r from-green-600 to-green-700"
                                            : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 hover:scale-[1.02] active:scale-[0.98]"
                                    }`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                                    <div className="relative z-10 flex items-center justify-center space-x-2 text-lg tracking-wide">
                                        {copyStatus === "copying" && (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span>Copying...</span>
                                            </>
                                        )}
                                        {copyStatus === "copied" && (
                                            <>
                                                <Check className="w-5 h-5 text-white animate-in zoom-in duration-200" />
                                                <span>Copied!</span>
                                            </>
                                        )}
                                        {copyStatus === "idle" && (
                                            <>
                                                <Copy className="w-5 h-5 text-white" />
                                                <span>Copy Webhook URL</span>
                                            </>
                                        )}
                                    </div>
                                </button>

                                {copyStatus === "copied" && (
                                    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-3 fade-in duration-500">
                                        <div className="bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-lg border border-green-400/50 rounded-xl px-6 py-3 shadow-2xl">
                                            <div className="flex items-center space-x-3">
                                                <div className="relative">
                                                    <Check className="w-5 h-5 text-white animate-in zoom-in duration-300" />
                                                    <div className="absolute inset-0 w-5 h-5 bg-white/20 rounded-full blur-sm animate-pulse"></div>
                                                </div>
                                                <span className="text-white font-semibold tracking-wide">
                                                    Webhook URL copied
                                                    successfully
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
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
