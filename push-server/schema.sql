CREATE TABLE IF NOT EXISTS push_subscriptions (
 endpoint TEXT PRIMARY KEY,
 subscription JSONB NOT NULL,
 preferences JSONB NOT NULL DEFAULT '{"updatedExams":true,"newSources":true,"examReminders":true,"majorUpdates":true}'::jsonb,
 created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
 updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS push_deliveries (
 endpoint TEXT NOT NULL REFERENCES push_subscriptions(endpoint) ON DELETE CASCADE,
 event_key TEXT NOT NULL,
 attempted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
 PRIMARY KEY(endpoint,event_key)
);
