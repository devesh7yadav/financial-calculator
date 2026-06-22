function Output({answer, text}){
    return(
<       div className="grid min-w-32 md:w-48 md:h-24 border p-4 rounded mx-4">
          <h2 className="grid text-xs md:text-sm text-[#134074]">{text}</h2>
          <div className="grid text-sm md:text-xl font-semibold text-[#13315c] mt-2">{answer}</div>
        </div>
    )
}

export default Output;