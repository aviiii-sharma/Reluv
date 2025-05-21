-- Add policy to allow inserting users
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON public.users;
CREATE POLICY "Allow insert for authenticated users" ON public.users
    FOR INSERT
    WITH CHECK (true);

-- Add policy to allow updating own user data
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
CREATE POLICY "Users can update own data" ON public.users
    FOR UPDATE
    USING (auth.uid()::text = user_id);

-- Add policy to allow all users to view all users
DROP POLICY IF EXISTS "Public users view" ON public.users;
CREATE POLICY "Public users view" ON public.users
    FOR SELECT
    USING (true);

-- Enable realtime for users table
alter publication supabase_realtime add table public.users;
