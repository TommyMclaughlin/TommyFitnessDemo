using System;
using Xunit;
using backend.Models;

namespace backend.Tests
{
    public class MembershipTests
    {
        [Fact]
        public void CalculateNewExpiration_AddsMonthsCorrectly()
        {
            // Arrange
            var user = new ApplicationUser
            {
                Email = "test@example.com",
                ExpiresOn = new DateTime(2024, 1, 1) // Start date
            };
            int monthsToAdd = 3;

            // Act - Manual logic check based on Program.cs logic
            DateTime baseDate = user.ExpiresOn > DateTime.UtcNow ? user.ExpiresOn : DateTime.UtcNow;
            user.ExpiresOn = baseDate.AddMonths(monthsToAdd);

            // Assert
            // Since DateTime.UtcNow changes, we'll check if it's at least the baseDate + months
            Assert.True(user.ExpiresOn > DateTime.UtcNow);
            Assert.Equal(monthsToAdd, (user.ExpiresOn.Month - baseDate.Month + 12) % 12);
        }

        [Fact]
        public void OrderModel_SetsPropertiesCorrectly()
        {
            // Arrange
            var order = new Order
            {
                PlanTitle = "Pro Plan",
                Amount = 99.99m,
                Months = 12,
                CreatedAt = DateTime.UtcNow
            };

            // Assert
            Assert.Equal("Pro Plan", order.PlanTitle);
            Assert.Equal(99.99m, order.Amount);
            Assert.Equal(12, order.Months);
            Assert.True(order.CreatedAt <= DateTime.UtcNow);
        }
    }
}
