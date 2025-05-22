-- Create user_type enum
CREATE TYPE user_type AS ENUM ('buyer', 'seller');

-- Create item_category enum
CREATE TYPE item_category AS ENUM ('clothing', 'accessories', 'footwear', 'jewelry', 'bags', 'home_decor', 'other');

-- Create item_status enum
CREATE TYPE item_status AS ENUM ('available', 'sold', 'reserved');

-- Create filter_type enum
CREATE TYPE filter_type AS ENUM ('category', 'size', 'price_range', 'condition');

-- Modify existing users table to match requirements
ALTER TABLE IF EXISTS public.users 
ADD COLUMN IF NOT EXISTS user_type user_type NOT NULL DEFAULT 'buyer',
ADD COLUMN IF NOT EXISTS username TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS profile_picture TEXT,
ADD COLUMN IF NOT EXISTS follower_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS bio TEXT;

-- Create items table
CREATE TABLE IF NOT EXISTS public.items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category item_category NOT NULL,
    size TEXT,
    images JSONB NOT NULL DEFAULT '[]'::JSONB,
    description TEXT,
    seller_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    views INTEGER DEFAULT 0,
    status item_status DEFAULT 'available',
    condition TEXT,
    brand TEXT,
    original_price DECIMAL(10,2)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buyer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'pending',
    shipping_address JSONB,
    tracking_number TEXT
);

-- Create search_filters table
CREATE TABLE IF NOT EXISTS public.search_filters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filter_type filter_type NOT NULL,
    filter_value TEXT NOT NULL,
    display_name TEXT NOT NULL,
    priority INTEGER DEFAULT 0
);

-- Create policies table
CREATE TABLE IF NOT EXISTS public.policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- Create featured_items table
CREATE TABLE IF NOT EXISTS public.featured_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
    priority INTEGER DEFAULT 0,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE
);

-- Create followers table
CREATE TABLE IF NOT EXISTS public.followers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(follower_id, seller_id)
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(item_id, reviewer_id)
);

-- Create wishlists table (additional suggestion)
CREATE TABLE IF NOT EXISTS public.wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, item_id)
);

-- Create tags table (additional suggestion)
CREATE TABLE IF NOT EXISTS public.tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create item_tags junction table (additional suggestion)
CREATE TABLE IF NOT EXISTS public.item_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
    UNIQUE(item_id, tag_id)
);

-- Create notifications table (additional suggestion)
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notification_type TEXT NOT NULL,
    related_id UUID
);

-- Create trigger to update follower_count when followers change
CREATE OR REPLACE FUNCTION update_follower_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE users SET follower_count = follower_count + 1 WHERE id = NEW.seller_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE users SET follower_count = follower_count - 1 WHERE id = OLD.seller_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_follower_count_trigger ON followers;
CREATE TRIGGER update_follower_count_trigger
AFTER INSERT OR DELETE ON followers
FOR EACH ROW EXECUTE FUNCTION update_follower_count();

-- Create trigger to update item status when order is created
CREATE OR REPLACE FUNCTION update_item_status_on_order()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE items SET status = 'sold' WHERE id = NEW.item_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_item_status_trigger ON orders;
CREATE TRIGGER update_item_status_trigger
AFTER INSERT ON orders
FOR EACH ROW EXECUTE FUNCTION update_item_status_on_order();

-- Enable Row Level Security on all tables
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_filters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.item_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Items policies
DROP POLICY IF EXISTS "items_select_policy" ON public.items;
CREATE POLICY "items_select_policy" ON public.items
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "items_insert_policy" ON public.items;
CREATE POLICY "items_insert_policy" ON public.items
    FOR INSERT WITH CHECK (auth.uid() = seller_id AND EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'seller'
    ));

DROP POLICY IF EXISTS "items_update_policy" ON public.items;
CREATE POLICY "items_update_policy" ON public.items
    FOR UPDATE USING (auth.uid() = seller_id);

DROP POLICY IF EXISTS "items_delete_policy" ON public.items;
CREATE POLICY "items_delete_policy" ON public.items
    FOR DELETE USING (auth.uid() = seller_id);

-- Orders policies
DROP POLICY IF EXISTS "orders_select_policy" ON public.orders;
CREATE POLICY "orders_select_policy" ON public.orders
    FOR SELECT USING (
        auth.uid() = buyer_id OR 
        auth.uid() IN (SELECT seller_id FROM items WHERE id = item_id)
    );

DROP POLICY IF EXISTS "orders_insert_policy" ON public.orders;
CREATE POLICY "orders_insert_policy" ON public.orders
    FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Followers policies
DROP POLICY IF EXISTS "followers_select_policy" ON public.followers;
CREATE POLICY "followers_select_policy" ON public.followers
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "followers_insert_policy" ON public.followers;
CREATE POLICY "followers_insert_policy" ON public.followers
    FOR INSERT WITH CHECK (auth.uid() = follower_id);

DROP POLICY IF EXISTS "followers_delete_policy" ON public.followers;
CREATE POLICY "followers_delete_policy" ON public.followers
    FOR DELETE USING (auth.uid() = follower_id);

-- Reviews policies
DROP POLICY IF EXISTS "reviews_select_policy" ON public.reviews;
CREATE POLICY "reviews_select_policy" ON public.reviews
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "reviews_insert_policy" ON public.reviews;
CREATE POLICY "reviews_insert_policy" ON public.reviews
    FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

DROP POLICY IF EXISTS "reviews_update_policy" ON public.reviews;
CREATE POLICY "reviews_update_policy" ON public.reviews
    FOR UPDATE USING (auth.uid() = reviewer_id);

DROP POLICY IF EXISTS "reviews_delete_policy" ON public.reviews;
CREATE POLICY "reviews_delete_policy" ON public.reviews
    FOR DELETE USING (auth.uid() = reviewer_id);

-- Wishlists policies
DROP POLICY IF EXISTS "wishlists_select_policy" ON public.wishlists;
CREATE POLICY "wishlists_select_policy" ON public.wishlists
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "wishlists_insert_policy" ON public.wishlists;
CREATE POLICY "wishlists_insert_policy" ON public.wishlists
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "wishlists_delete_policy" ON public.wishlists;
CREATE POLICY "wishlists_delete_policy" ON public.wishlists
    FOR DELETE USING (auth.uid() = user_id);

-- Notifications policies
DROP POLICY IF EXISTS "notifications_select_policy" ON public.notifications;
CREATE POLICY "notifications_select_policy" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "notifications_update_policy" ON public.notifications;
CREATE POLICY "notifications_update_policy" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS items_seller_id_idx ON public.items(seller_id);
CREATE INDEX IF NOT EXISTS items_category_idx ON public.items(category);
CREATE INDEX IF NOT EXISTS items_status_idx ON public.items(status);
CREATE INDEX IF NOT EXISTS orders_buyer_id_idx ON public.orders(buyer_id);
CREATE INDEX IF NOT EXISTS orders_item_id_idx ON public.orders(item_id);
CREATE INDEX IF NOT EXISTS followers_seller_id_idx ON public.followers(seller_id);
CREATE INDEX IF NOT EXISTS followers_follower_id_idx ON public.followers(follower_id);
CREATE INDEX IF NOT EXISTS reviews_item_id_idx ON public.reviews(item_id);
CREATE INDEX IF NOT EXISTS wishlists_user_id_idx ON public.wishlists(user_id);
CREATE INDEX IF NOT EXISTS wishlists_item_id_idx ON public.wishlists(item_id);
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_is_read_idx ON public.notifications(is_read);

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
ALTER PUBLICATION supabase_realtime ADD TABLE public.items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.search_filters;
ALTER PUBLICATION supabase_realtime ADD TABLE public.policies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.featured_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.followers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE public.wishlists;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tags;
ALTER PUBLICATION supabase_realtime ADD TABLE public.item_tags;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;