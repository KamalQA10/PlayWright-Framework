# Step 1: Use Playwright's official image (includes all dependencies)
FROM mcr.microsoft.com/playwright:v1.54.1-jammy

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of your project files into the container
COPY . .

# Step 5: Run Playwright install (for browsers)
RUN npx playwright install --with-deps

# Step 6: Default command (can be changed during docker run)
CMD ["npx", "playwright", "test", "--project=ui"]

