import type { GalleryItem } from '$lib/types';
import normalDarwinImg from '$lib/assets/images/darwin-happy.png';
import thinkDarwinImg from '$lib/assets/images/darwin-think.png';
import mesmerisedDarwinImg from '$lib/assets/images/darwin-mesmerised.png';
import fullDarwinImg from '$lib/assets/images/darwin-full.png';
import suspectingDarwinImg from '$lib/assets/images/darwin-suspecting.png';
import screamingDarwinImg from '$lib/assets/images/darwin-screaming.png';
import partyDarwinImg from '$lib/assets/images/darwin-hat.png';
import cuteThinkingDarwinImg from '$lib/assets/images/darwin-curious.png';
import bizarreDarwinImg from '$lib/assets/images/darwin-bizarre.png';
import laughingDarwinImg from '$lib/assets/images/darwin-laugh.png';
import pitifulDarwinImg from '$lib/assets/images/darwin-pitiful.png';
import joyDarwinImg from '$lib/assets/images/darwin-joy.png';

export const galleryEntries: GalleryItem[] = [
	{
		id: 'normal-darwin',
		title: 'I am Darwin',
		image: normalDarwinImg,
		shortDesc: 'Darwin starts the day with suspicious confidence.',
		longDesc:
			'A placeholder memory for a future image of Darwin greeting the morning with too much confidence and not enough context.'
	},
	{
		id: 'think-darwin',
		title: "I'm thinking..",
		image: thinkDarwinImg,
		shortDesc: 'A small question becomes a whole investigation.',
		longDesc:
			'A placeholder memory for a future image of Darwin looking deeply curious, probably about something that was never meant to be that serious.'
	},
	{
		id: 'mesmerised-darwin',
		title: "I think I'm in love",
		image: mesmerisedDarwinImg,
		shortDesc: 'Darwin appears exactly when the party gets weird.',
		longDesc:
			'A placeholder memory for a future party scene where Darwin somehow becomes the unofficial mascot of the entire situation.'
	},
	{
		id: 'full-darwin',
		title: 'Ready for a picture!',
		image: fullDarwinImg,
		shortDesc: 'The energy is gone, but the expression remains.',
		longDesc:
			'A placeholder memory for a future image of Darwin being sleepy, peaceful, and maybe slightly disappointed by the concept of wakefulness.'
	},
	{
		id: 'suspecting-darwin',
		title: "Something's off.",
		image: suspectingDarwinImg,
		shortDesc: 'Something happened, and Darwin knows too much.',
		longDesc:
			'A placeholder memory for a future image where Darwin investigates clues with dramatic seriousness and absolutely no official authority.'
	},
	{
		id: 'screaming-darwin',
		title: 'ARRRGHHH!!!',
		image: screamingDarwinImg,
		shortDesc: 'In the court of the Darwin King!',
		longDesc:
			'A placeholder memory for a future tiny Darwin image that proves size has no relationship with emotional impact.'
	},
	{
		id: 'party-darwin',
		title: 'We only live once',
		image: partyDarwinImg,
		shortDesc: 'A calm face in a very not-calm situation.',
		longDesc:
			'A placeholder memory for a future image of Darwin standing near chaos, either causing it or pretending not to notice it.'
	},
	{
		id: 'cutethink-darwin',
		title: "I'm thinking.. cutely!",
		image: cuteThinkingDarwinImg,
		shortDesc: 'A noble pose for a questionable kingdom.',
		longDesc:
			'A placeholder memory for a future image of Darwin looking royal, regal, and probably unqualified to rule anything.'
	},
	{
		id: 'laughing-darwin',
		title: 'I know what kind of man you are',
		image: laughingDarwinImg,
		shortDesc: 'Nobody knows what Darwin is thinking. Maybe Darwin does not either.',
		longDesc:
			'A placeholder memory for a future mysterious Darwin image, full of unanswered questions and dramatic silence.'
	},
	{
		id: 'bizarre-darwin',
		title: 'Wait, this looks like',
		image: bizarreDarwinImg,
		shortDesc: 'Fear is present. Darwin simply ignores it.',
		longDesc:
			'A placeholder memory for a future image of Darwin being brave in the face of something probably very silly.'
	},
	{
		id: 'joy-darwin',
		title: 'I got an A+!',
		image: joyDarwinImg,
		shortDesc: 'The math is not mathing.',
		longDesc:
			'A placeholder memory for a future image where Darwin confronts confusion directly and receives no useful answers.'
	},
	{
		id: 'pitiful-darwin',
		title: 'Will you..?',
		image: pitifulDarwinImg,
		shortDesc: 'Some stories are told. Others are Darwin.',
		longDesc:
			'A placeholder memory for a future final gallery image, where Darwin becomes less of a character and more of a myth.'
	}
];
