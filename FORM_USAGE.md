# Service-Specific Form Components

All service-specific forms are located in `src/components/forms/` and have tailored fields for each service.

## Available Forms

### 1. Stage Rental Form
**File:** `StagRentalForm.astro`
**Best for:** Mobile Stage Rental page

**Unique Fields:**
- Stage dimensions preference
- Sound system requirements (Basic, Professional, None)
- Lighting needs (Basic, Advanced, None)
- Delivery/Setup options

**Usage:**
```astro
---
import StageRentalForm from '../components/forms/StagRentalForm.astro';
---

<section id="quote" class="py-24 bg-brand-secondary border-t border-brand-border">
  <div class="max-w-container mx-auto px-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Contact Info (existing) -->
      <div>
        <!-- ... existing contact info ... -->
      </div>

      <!-- Form -->
      <div class="lg:col-span-2">
        <StageRentalForm id="stage-form" />
      </div>
    </div>
  </div>
</section>
```

---

### 2. Silent Disco Form
**File:** `SilentDiscoForm.astro`
**Best for:** Silent Disco Rentals page

**Unique Fields:**
- Number of headphones needed *
- Number of DJ channels (1-4)
- Event duration (4h, 6h, 8h, Full Night)
- Add-on options (Backup headphones, Outdoor equipment, DJ operator)

**Usage:**
```astro
---
import SilentDiscoForm from '../components/forms/SilentDiscoForm.astro';
---

<section id="quote" class="py-24 bg-brand-secondary border-t border-brand-border">
  <div class="max-w-container mx-auto px-6">
    <SilentDiscoForm id="disco-form" />
  </div>
</section>
```

---

### 3. Projector Rental Form
**File:** `ProjectorRentalForm.astro`
**Best for:** Projector Rental and Purchase pages

**Unique Fields:**
- Environment (Indoor, Outdoor, Both)
- Screen size (estimated)
- Projector-to-screen distance (throw distance)
- Ambient light level
- Content type (PowerPoint, Video, Live Camera, etc.)
- Resolution preference (HD, WUXGA, 4K)
- Rental duration (1 Day, Multi-Day, Weekly, Monthly)
- Delivery/Support type

**Usage:**
```astro
---
import ProjectorRentalForm from '../components/forms/ProjectorRentalForm.astro';
---

<section id="quote" class="py-24 bg-brand-secondary border-t border-brand-border">
  <div class="max-w-container mx-auto px-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Contact Info -->
      <div>
        <!-- ... existing contact info ... -->
      </div>

      <!-- Form -->
      <div class="lg:col-span-2">
        <ProjectorRentalForm id="projector-form" />
      </div>
    </div>
  </div>
</section>
```

---

### 4. Outdoor Movie Form (To Create)
**File:** `OutdoorMovieForm.astro`
**Best for:** Outdoor Movie Rentals page

**Fields to include:**
- Screen size preference
- Audience size
- Ambient light (outdoor considerations)
- Sound requirements
- Setup needs

---

### 5. Projection Mapping Form (To Create)
**File:** `ProjectionMappingForm.astro`
**Best for:** Projection Mapping page

**Fields to include:**
- Surface dimensions to map
- Surface type (Building, Structure, Custom)
- Complexity level (Basic, Intermediate, Advanced)
- Content description
- Duration/Event length

---

## Form Features (All Forms)

✅ **Contact Information** - Name, Email, Phone, Organization
✅ **Event Details** - Date, Location, Event Type, Guest Count
✅ **Service-Specific Fields** - Tailored to each service
✅ **Additional Details** - Notes/special requirements
✅ **Consent Checkbox** - Privacy compliance
✅ **Success Feedback** - Confirmation message
✅ **Form Validation** - Required field validation
✅ **Consistent Styling** - AvValley brand colors

## Adding a New Form

1. Create new file in `src/components/forms/`
2. Copy structure from existing form
3. Modify fields specific to that service
4. Update ID and button text
5. Add to appropriate page

Example structure:
```astro
---
interface Props {
  id?: string;
}

const { id = 'service-form' } = Astro.props;
---

<!-- Same structure as existing forms -->
<!-- Service-specific fields go in their own section -->
```

## Form Submission

All forms:
- Log form data to console (development)
- Show success message on submit
- Clear form after 3 seconds
- Ready for API integration (replace console.log with API call)

## Next Steps

- Create OutdoorMovieForm
- Create ProjectionMappingForm
- Integrate forms into all service pages
- Set up backend API endpoint for form submissions
