import { db } from "@workspace/db/src";
import { programsTable } from "@workspace/db/src/schema/programs";
import { eventsTable } from "@workspace/db/src/schema/events";
import { galleryTable } from "@workspace/db/src/schema/gallery";

async function main() {
  console.log("Seeding database...");

  const existingPrograms = await db.select().from(programsTable);
  if (existingPrograms.length === 0) {
    await db.insert(programsTable).values([
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
    ]);
    console.log("Seeded Programs");
  }

  const existingEvents = await db.select().from(eventsTable);
  if (existingEvents.length === 0) {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const theMonthAfter = new Date();
    theMonthAfter.setMonth(theMonthAfter.getMonth() + 2);

    await db.insert(eventsTable).values([
      {
        title: "Spring Open House",
        description: "Meet our teachers, tour the facilities, and learn about our play-based curriculum.",
        date: nextMonth.toISOString(),
        time: "10:00 AM - 2:00 PM",
        location: "Main Campus",
        type: "open-house",
      },
      {
        title: "Parent-Teacher Workshop",
        description: "A collaborative session discussing early childhood development milestones.",
        date: theMonthAfter.toISOString(),
        time: "6:00 PM - 8:00 PM",
        location: "Virtual",
        type: "workshop",
      }
    ]);
    console.log("Seeded Events");
  }

  const existingGallery = await db.select().from(galleryTable);
  if (existingGallery.length === 0) {
    await db.insert(galleryTable).values([
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
    ]);
    console.log("Seeded Gallery");
  }

  console.log("Seeding complete!");
}

main().catch(console.error);
