import Image from "next/image";

export function Logo() {
    return (
        <Image
            src="/logo.svg"
            alt="Logo CashTrackr"
            width={400}
            height={100}
            priority
            sizes="(max-width: 640px) 70vw, 400px"
            style={{ width: "min(400px, 100%)", height: "auto" }}
            className="w-auto h-auto"
        />
    )
}
