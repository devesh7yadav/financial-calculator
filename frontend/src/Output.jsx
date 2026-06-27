function Output({answer, text}){
    return(
<       div className="grid min-w-32 md:w-full md:h-24 border p-4 rounded mx-4 bg-[#b5d1ec] shadow-xl">
          <h2 className="grid text-xs md:text-sm text-[#134074] text-center">{text}</h2>
          <div className="grid text-sm md:text-xl font-semibold text-[#13315c] mt-2 text-center">{answer}</div>
        </div>
    )
}

export default Output;