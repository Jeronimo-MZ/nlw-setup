import { Check } from "phosphor-react";

export const NewHabitForm = () => {
    return (
        <form className="w-full flex flex-col mt-6">
            <label className="font-semibold leading-tight" htmlFor="title">
                Qual seu comprometimento?
            </label>
            <input
                className="p-4 rounded-lg mt-12 bg-zinc-800 text-white placeholder:text-zinc-700"
                name="title"
                placeholder="Ex.: exercicios, dormir bem, ..."
                autoFocus
            />
            <label className="font-semibold leading-tight mt-4" htmlFor="">
                Qual a recorrência?
            </label>

            <button
                className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500 duration-200"
                type="submit"
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    );
};
