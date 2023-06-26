import { useState } from 'react';
import { useContract, ConnectWallet} from '@thirdweb-dev/react';
import styles from '../styles/dex.module.css';

export default function DEX() {
    const contractAddress = '0x8Ba88EE9B7533900cAc23Bac113C0e97a16DCaEf'; // deployed to Sepolia
    const { contract, isLoading, error } = useContract(contractAddress);
    const [status, setStatus] = useState('');

    const addLiquidity = async (amountOfToken) => {
        try {
            setStatus('Processing...');
            const tx = await contract.addLiquidity(amountOfToken, { value: amountOfToken });
            await tx.wait();
            setStatus('Transaction successful');
        } catch (error) {
            setStatus(`Error: ${error.message}`);
        }
    };

    const removeLiquidity = async (amountOfLPTokens) => {
        try {
            setStatus('Processing...');
            const tx = await contract.removeLiquidity(amountOfLPTokens);
            await tx.wait();
            setStatus('Transaction successful');
        } catch (error) {
            setStatus(`Error: ${error.message}`);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Decentralized Exchange</h1>
            <ConnectWallet className={styles.connectWallet} />
            <div>
                <input type="text" placeholder="Amount of Token" id="amountOfToken" />
                <button className={styles.button} onClick={() => addLiquidity('addLiquidity', document.getElementById('amountOfToken').value)}>Add Liquidity</button>
            </div>
            <div>
                <input type="text" placeholder="Amount of LP Tokens" id="amountOfLPTokens" />
                <button className={styles.button} onClick={() => removeLiquidity ('removeLiquidity', document.getElementById('amountOfLPTokens').value)}>Remove Liquidity</button>
            </div>
            <div>
                <input type="text" placeholder="Min Tokens to Receive" id="minTokensToReceive" />
                <button className={styles.button} onClick={() => executeContractMethod('ethToTokenSwap', document.getElementById('minTokensToReceive').value)}>Swap ETH for Tokens</button>
            </div>
            <div>
                <input type="text" placeholder="Tokens to Swap" id="tokensToSwap" />
                <input type="text" placeholder="Min ETH to Receive" id="minEthToReceive" />
                <button className={styles.button} onClick={() => executeContractMethod('tokenToEthSwap', document.getElementById('tokensToSwap').value, document.getElementById('minEthToReceive').value)}>Swap Tokens for ETH</button>
            </div>
            <div>
                <p>{status}</p>
            </div>
        </div>
    );
}
