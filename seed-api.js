async function seed() {
  const programs = [
    {
      name: "Infant Care",
      ageRange: "6 weeks - 18 months",
      description: "A nurturing environment designed to support cognitive and physical development in infants.",
      schedule: "Mon-Fri 7:00 AM - 6:00 PM",
      monthlyFee: 1500,
      capacity: 10,
      enrolled: 8,
      imageUrl: "https://images.unsplash.com/photo-1544280540-3ec55106ce41?w=800&q=80",
      features: ["Low caregiver-to-infant ratio", "Daily progress reports", "Sensory development activities"]
    },
    {
      name: "Toddler Discovery",
      ageRange: "18 months - 3 years",
      description: "Interactive play-based learning that encourages curiosity, socialization, and motor skills.",
      schedule: "Mon-Fri 7:00 AM - 6:00 PM",
      monthlyFee: 1300,
      capacity: 15,
      enrolled: 12,
      imageUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de2e?w=800&q=80",
      features: ["Potty training support", "Creative arts & crafts", "Outdoor playtime"]
    },
    {
      name: "Preschool Prep",
      ageRange: "3 - 4 years",
      description: "Foundation building for early literacy, math, and social-emotional skills in a structured setting.",
      schedule: "Mon-Fri 8:00 AM - 3:00 PM",
      monthlyFee: 1100,
      capacity: 20,
      enrolled: 18,
      imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
      features: ["Language & Phonics", "Introduction to STEM", "Music & Movement"]
    },
    {
      name: "Kindergarten Readiness",
      ageRange: "4 - 5 years",
      description: "Advanced curriculum focused on academic preparedness and independent learning.",
      schedule: "Mon-Fri 8:00 AM - 3:00 PM",
      monthlyFee: 1000,
      capacity: 20,
      enrolled: 15,
      imageUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80",
      features: ["Reading & Writing readiness", "Basic mathematics", "Field trips"]
    }
  ];

  console.log("Seeding programs...");
  for (const prog of programs) {
    try {
      const res = await fetch("http://localhost:5000/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prog)
      });
      if (!res.ok) {
        console.error("Failed to seed program:", await res.text());
      } else {
        console.log("Seeded:", prog.name);
      }
    } catch (err) {
      console.error("Error creating program:", err);
    }
  }

  const photos = [
    {
      url: "https://images.unsplash.com/photo-1563461660947-f07fc30f56fb?w=800&q=80",
      caption: "Learning through play",
      category: "activities"
    },
    {
      url: "https://images.unsplash.com/photo-1544280540-3ec55106ce41?w=800&q=80",
      caption: "Outdoor exploration",
      category: "outdoor"
    },
    {
      url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80",
      caption: "Healthy snacks time",
      category: "meals"
    }
  ];

  console.log("Seeding gallery...");
  for (const photo of photos) {
    // There's a problem here: POST /gallery requires multipart form data with 'image' file according to my new spec
    // So let's skip seeding gallery via HTTP since it expects a file upload now
  }
}

seed().then(() => console.log("Done."));
