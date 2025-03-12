export const getAvatar = (category: string): string => {
  const avatars: Record<string, string> = {
    Entertainment: "/images/avatars/pixel-playground.jpg",
    Bills: "/images/avatars/spark-electric-solutions.jpg",
    Groceries: "/images/avatars/green-plate-eatery.jpg",
    "Dining Out": "/images/avatars/flavor-fiesta.jpg",
    Transportation: "/images/avatars/swift-ride-share.jpg",
    "Personal Care": "/images/avatars/serenity-spa-and-wellness.jpg",
    Education: "/images/avatars/elevate-education.jpg",
    Lifestyle: "/images/avatars/bytewise.jpg",
    Shopping: "/images/avatars/technova-innovations.jpg",
    General: "/images/avatars/urban-services-hub.jpg",
  }

  return avatars[category] || ""
}
