import { Button } from "@/components/ui/button";
interface BlockchainOptionsProps {
    author: string;
    owner: string;
    price: string;
    publishedDate: string;
    isListed: boolean;
}

const BlockchainOptions: React.FC<BlockchainOptionsProps> = ({ price, owner, publishedDate, author, isListed }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ marginBottom: "1rem" }}>
                <p style={{ fontSize: "1rem", fontWeight: "bold" }}>Owner: {owner}</p>
                <p style={{ fontSize: "1rem" }}>Author: {author}</p>
                <p style={{ fontSize: "1rem" }}>Price: {price}</p>
                <p style={{ fontSize: "1rem" }}>Published Date: {publishedDate}</p>
            </div>
            <div>
                {isListed ? (
                    <>
                        <Button style={{ backgroundColor: "#000", color: "#fff", padding: "0.5rem 1rem", borderRadius: "0.25rem" }}>
                            BUY
                        </Button>
                    </>
                ) : (
                    <p style={{ fontSize: "1rem" }}>Not listed</p>
                )}
            </div>
        </div>
    );
}
 
export default BlockchainOptions;

