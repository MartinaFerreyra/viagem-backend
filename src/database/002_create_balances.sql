CREATE TABLE IF NOT EXISTS balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id UUID NOT NULL,
    currency VARCHAR(3) NOT NULL,
    amount NUMERIC(18, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_balances_wallet
        FOREIGN KEY (wallet_id)
        REFERENCES wallets(id),

    CONSTRAINT unique_wallet_currency
        UNIQUE (wallet_id, currency),

    CONSTRAINT positive_balance
        CHECK (amount >= 0)
);

