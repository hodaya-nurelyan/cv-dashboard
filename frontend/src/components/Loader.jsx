// components/Loader.jsx
const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-[#0f172a]">
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-teal-400 border-t-transparent animate-spin" />
                <div className="absolute inset-4 bg-[#0f172a] rounded-full" />
                <div className="absolute inset-6 rounded-full bg-teal-500 opacity-20 animate-ping" />
            </div>
        </div>
    );
};

export default Loader;
