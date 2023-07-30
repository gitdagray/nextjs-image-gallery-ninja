import Link from "next/link"

type Props = {
    topic: string,
    prevPage: string | null,
    nextPage: string | null,
}

export default function Footer({ topic, prevPage, nextPage }: Props) {
    if (!prevPage && !nextPage) return

    const pageNums = []
    if (prevPage && nextPage) {
        for (let i = parseInt(prevPage) + 1; i < parseInt(nextPage); i++) {
            pageNums.push(i)
        }
    }

    return (

        <section className="flex flex-row justify-between items-center px-2 py-4 font-bold w-60 mx-auto">

            {prevPage
                ? (
                    <>
                        <Link
                            href={`/results/${topic}/${prevPage}`}
                            className={!prevPage ? "mx-auto" : ""}
                        >
                            &lt;&lt;&lt;
                        </Link>


                        {pageNums.map(num => (
                            num === (parseInt(prevPage) + 1)
                                ? num
                                : (
                                    <Link href={`/results/${topic}/${num}`}
                                        className="underline"
                                    >{num}</Link>
                                )
                        ))}
                    </>

                ) : null}

            {nextPage
                ? (
                    <Link
                        href={`/results/${topic}/${nextPage}`}
                        className={!prevPage ? "mx-auto" : ""}
                    >
                        {!prevPage ? "more" : null} &gt;&gt;&gt;
                    </Link>
                ) : null}

        </section>
    )
}