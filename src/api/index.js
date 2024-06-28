const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdiNGY3OTA5YWEyNTBmOWFlNjJmNmQwZjljMDY0Y2VhOTY0YzI3ZWZkMGZhNWQ3MzhkOTRiMDgyOWUzZDkwMDI1M2VmMWZhMjM4Yjg0NzYxIn0.eyJhdWQiOiIzMjhhMTAzNy1jNTE5LTQzODctYmI1My1hOGNhM2ZiYjQ5YjUiLCJqdGkiOiI3YjRmNzkwOWFhMjUwZjlhZTYyZjZkMGY5YzA2NGNlYTk2NGMyN2VmZDBmYTVkNzM4ZDk0YjA4MjllM2Q5MDAyNTNlZjFmYTIzOGI4NDc2MSIsImlhdCI6MTcxOTU4MDUzNSwibmJmIjoxNzE5NTgwNTM1LCJleHAiOjE3MzU2ODk2MDAsInN1YiI6IjExMjE0MTg2IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxODIzODk4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZjE3MzhhM2YtNGVjMy00NWVhLWI3MTktZGQyYzI0MjRjYzVkIn0.aIf15h4ytNEBhuGGbB6hX1NQeWzmekPbDPhst8N5UPOXbVW7GdadyjeXb_ZYXhSqGVAUeK0ThXut_dhvHY51i6cyiADHY8Y28M9wq5XgwREp1meEZLFHUJbX2OjYCWy4fYosM23hqyrUASESPVOdHnFPuWyFt4vxy1uyWzMykFjTTDpdPqUGELaTXqyBGzU2H6aZhP3uRDq7pUsEYTj7rqyhfYEXi7hDi00EyFXIPurAz8vDUQ9NRl33AxjZibwmLqXh2lcyAYfHs7Gj2hVMXU1qXewkI2uljIbSmd6yB_DEM5OvLJH0tFcZzcskxtV7gjT0F_ItvdENQAvCT73fmQ";

const api = {
  get: async (route, params = {}) => {
    try {
      const url = new URL(route, "https://kirillshiryaev00.amocrm.ru");

      Object.keys(params).forEach(
        (key) => params[key] && url.searchParams.append(key, params[key])
      );

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error making GET request", error);
      throw error;
    }
  },
};

export default api;
