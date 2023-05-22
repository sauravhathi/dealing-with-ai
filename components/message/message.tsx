export const Message = ({ charCount, maxCharCount }: { charCount: number, maxCharCount: number }) => (
    <p className="t-2 mt-2">
        <span className={charCount > maxCharCount ? "text-red-500" : ""}>
            {charCount > maxCharCount ? "You have exceeded the maximum character count." : ""}
        </span>
    </p>
)