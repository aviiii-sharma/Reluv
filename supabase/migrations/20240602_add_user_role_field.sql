-- Add role field to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role VARCHAR(10) DEFAULT 'buyer';

-- Create index on role for faster queries
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- Update the RLS policy for users table
DROP POLICY IF EXISTS "Users can view their own data." ON public.users;
CREATE POLICY "Users can view their own data."
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Add policy for users to update their own data
DROP POLICY IF EXISTS "Users can update their own data." ON public.users;
CREATE POLICY "Users can update their own data."
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- Add seller verification field
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
