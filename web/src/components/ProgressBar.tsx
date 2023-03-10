type ProgressBarProps = {
    progress: number;
};
export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
            <div
                role="progressbar"
                aria-label="Progresso dos Hábitos completados neste dia"
                aria-valuenow={progress}
                className="h-3 rounded-xl bg-violet-600 transition-all"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};
