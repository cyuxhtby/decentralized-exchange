import { useEffect, useState } from 'react';
import { ConnectWallet, useWallet } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

export default function DEX() {
  const wallet = useWallet();
  const [contract, setContract] = useState(null);

  // Contract address
  const contractAddress = ''; // <-- Add your contract's address here

  useEffect(() => {
    if (wallet && wallet.provider) {
      // Create a contract instance
      const exchangeContract = new ethers.Contract(contractAddress, [], wallet.provider.getSigner());
      setContract(exchangeContract);
    }
  }, [wallet]);

  const addLiquidity = async (amountOfToken) => {
    if (contract) {
      const tx = await contract.addLiquidity(amountOfToken, { value: ethers.utils.parseEther("1") });
      await tx.wait();
      console.log('Liquidity added');
    }
  };

  const removeLiquidity = async (amountOfLPTokens) => {
    if (contract) {
      const tx = await contract.removeLiquidity(amountOfLPTokens);
      await tx.wait();
      console.log('Liquidity removed');
    }
  };

  const ethToTokenSwap = async (minTokensToReceive) => {
    if (contract) {
      const tx = await contract.ethToTokenSwap(minTokensToReceive, { value: ethers.utils.parseEther("1") });
      await tx.wait();
      console.log('ETH to Token swap completed');
    }
  };

  const tokenToEthSwap = async (tokensToSwap, minEthToReceive) => {
    if (contract) {
      const tx = await contract.tokenToEthSwap(tokensToSwap, minEthToReceive);
      await tx.wait();
      console.log('Token to ETH swap completed');
    }
  };

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer'
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Decentralized Exchange</h1>
      {!wallet && <ConnectWallet />}
      {wallet && wallet.provider && (
        <div>
          <button style={buttonStyle} onClick={() => addLiquidity("100")}>Add Liquidity</button>
          <button style={buttonStyle} onClick={() => removeLiquidity("10")}>Remove Liquidity</button>
          <button style={buttonStyle} onClick={() => ethToTokenSwap("10")}>Swap ETH for Tokens</button>
          <button style={buttonStyle} onClick={() => tokenToEthSwap("100", "1")}>Swap Tokens for ETH</button>
        </div>
      )}
    </div>
  );
}
