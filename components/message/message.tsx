export const Message = ({ charCount, maxCharCount }: { charCount: number, maxCharCount: number }) => (
    <p className="t-2 mt-2">
        <span className={charCount > maxCharCount ? "text-red-500" : ""}>
            {charCount}
        </span> / {maxCharCount}
    </p>
)
