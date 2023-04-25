import {
  useAddress,
  useClaimToken,
  useContract,
  useDisconnect,
  useMetamask,
  useTokenBalance,
  useTokenSupply,
} from "@thirdweb-dev/react";
import React, { useState } from "react";

const TokenDrop = () => {
  const [amount, setAmount] = useState("");
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  const { contract: tokenDrop } = useContract(
    "0x9BD19f93c5F274938ef3BBC610CCbA39C5672eDf"
  );

  const { data: tokenSupply } = useTokenSupply(tokenDrop);

  const { data: tokenBalance } = useTokenBalance(tokenDrop, address);

  const { mutate: claimTokens, isLoading } = useClaimToken(tokenDrop);

  return (
    <div>
      {address ? (
        <div>
          <div>
            <div>Connected with {address}</div>
            <div>
              Token Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}
            </div>
            <div>
              Total Token Supply: {tokenSupply?.displayValue}{" "}
              {tokenSupply?.symbol}
            </div>
            <div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                onClick={() =>
                  claimTokens(
                    { amount, to: address },
                    {
                      onSuccess: () => {
                        setAmount("");
                        alert("Tokens claimed successfully");
                      },
                    }
                  )
                }
                disabled={isLoading}
              >
                Claim {amount} {tokenBalance?.symbol}
              </button>
            </div>
            <button onClick={disconnectWallet}>Disconnect</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => connectWithMetamask()}>
            Connect with Metamask
          </button>
        </div>
      )}
    </div>
  );
};

export default TokenDrop;
