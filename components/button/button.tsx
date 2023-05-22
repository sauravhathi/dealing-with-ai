export const Button = ({ classCondition, ariaLabel, name, disabled }: { classCondition: boolean, ariaLabel: string, name: string, disabled: boolean }) => (
    <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ${classCondition ? 'opacity-50 cursor-not-allowed' : ''}`}
        type="submit"
        disabled={disabled}
        aria-label={ariaLabel}
    >
        {name}
    </button>
);