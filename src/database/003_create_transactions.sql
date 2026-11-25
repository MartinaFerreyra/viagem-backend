CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    wallet_id UUID NOT NULL,

    type VARCHAR(20) NOT NULL,

    from_currency VARCHAR(3) NOT NULL,
    to_currency VARCHAR(3),

    amount NUMERIC(18, 2) NOT NULL,
    converted_amount NUMERIC(18, 2),

    exchange_rate NUMERIC(20, 10),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_transactions_wallet
        FOREIGN KEY (wallet_id)
        REFERENCES wallets(id),

    CONSTRAINT positive_transaction_amount
        CHECK (amount > 0),

    CONSTRAINT valid_transaction_type
        CHECK (type IN ('deposit', 'withdrawal', 'exchange')),

    CONSTRAINT valid_exchange
        CHECK (
            type <> 'exchange'
            OR (
                to_currency IS NOT NULL
                AND converted_amount IS NOT NULL
                AND converted_amount > 0
                AND exchange_rate IS NOT NULL
                AND exchange_rate > 0
                AND from_currency <> to_currency
            )
        )
);

