// components/Loader.jsx
const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-[#0f172a]">
            <div className="relative w-20 h-20">
                {/* קו מסתובב עם גרדיאנט דק יותר */}
                <div className="absolute inset-0 rounded-full animate-spin"
                    style={{
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderColor: "transparent",
                        borderTopColor: "#ec4899", // ורוד
                        borderImage: "linear-gradient(to right, #ec4899, #a855f7, #fb923c) 1",
                    }}
                />
                {/* עיגול פנימי בצבע הרקע */}
                <div className="absolute inset-4 bg-[#0f172a] rounded-full" />
                {/* פינג עדין ורוד */}
                <div className="absolute inset-6 rounded-full bg-pink-500 opacity-20 animate-ping" />
            </div>
        </div>
    );


};

export default Loader;
