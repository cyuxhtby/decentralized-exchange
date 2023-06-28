import { useState } from 'react';
import { useContract, useNFT, Web3Button, ThirdwebNftMedia } from "@thirdweb-dev/react";

export default function Mint() {
    const contractAddress = "0x7362d9a3d94FB6822eFfc9443D2c21C390ef4eE4";
    const { contract } = useContract(contractAddress);
    const { data: nft, isLoading, error } = useNFT(contract, "0");
    const [status, setStatus] = useState('');

    const handleMint = async (contract) => {
        try {
            setStatus('Minting...');
            await contract.erc721.claim(1);
            setStatus('Minted Successfully');
        } catch (error) {
            setStatus(`Error: ${error.message}`);
        }
    };

    // Render the NFT onto the UI
    if (isLoading) return <div>Loading...</div>;
    if (error || !nft) return <div>NFT not found</div>;

    return (
        <div>
            <ThirdwebNftMedia metadata={nft.metadata} />
            <Web3Button action={handleMint}>
                Mint
            </Web3Button>
            <div>
                <p>{status}</p>
            </div>
        </div>
    );
}
