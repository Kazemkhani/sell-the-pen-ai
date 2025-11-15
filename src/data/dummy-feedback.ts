import type { DummyTranscriptType } from '@/lib/env';
import type { FeedbackAnalysis } from '@/types/feedback';

const GOOD_ANALYSIS: FeedbackAnalysis = {
  overall_score: 88,
  grade: 'A-',
  dimension_scores: {
    opening: {
      score: 18,
      points_earned: {
        clear_intro: 5,
        used_name: 4,
        asked_permission: 4,
        value_prop: 5,
      },
      explanation:
        'Confident intro, immediate name usage, and a crisp value hook referencing the Maple Street DOM stats.',
    },
    qualifying: {
      score: 22,
      points_earned: {
        question_count: 9,
        pain_focused: 8,
        listen_ratio: 5,
      },
      questions_asked: [
        'What has you considering a move right now?',
        'Where will you go next?',
        'When do you need to be there?',
        'What happens if it does not sell?'
      ],
      questions_missed: ['Who else is involved in the decision?'],
      explanation:
        'Agent hit three of the four must-ask questions and layered follow-ups to surface relocation urgency.',
    },
    objection_handling: {
      score: 20,
      points_earned: {
        looped_back: 12,
        persistence: 4,
        empathy_reframe: 4,
      },
      objections_encountered: ['We already have an agent', 'Just send me info'],
      loops_attempted: 3,
      explanation:
        'Each objection was acknowledged, clarified, and looped into a renewed ask for the appointment.',
    },
    appointment_setting: {
      score: 18,
      points_earned: {
        assumptive_close: 9,
        specific_times: 5,
        fair_technique: 4,
      },
      appointment_secured: true,
      explanation:
        'Agent offered Tuesday/Wednesday slots, used the "fair" frame, and locked a Tuesday 2pm commitment.',
    },
    tonality: {
      score: 10,
      points_earned: {
        energy: 3,
        name_usage: 2,
        pacing: 3,
        precision: 2,
      },
      red_flags: [],
      explanation:
        'Energetic delivery with precise language; tone stayed confident even during objections.',
    },
  },
  strengths: [
    {
      what: 'Assertive opening',
      timestamp: '00:05',
      quote: 'John, this is Maya Ortiz with Summit Realty. Is now a bad time?',
      why_good: 'Respects time while keeping control—classic Mike Ferry opening cadence.',
    },
    {
      what: 'Looped objection',
      timestamp: '00:31',
      quote: 'I get working with another agent. What would it take for you to even consider a second opinion?',
      why_good: 'Acknowledged, clarified, and looped back to the appointment ask.',
    },
  ],
  critical_mistakes: [
    {
      issue_type: 'qualifying',
      timestamp: '00:18',
      what_they_said: 'Okay, sounds like timing is tight. Got it.',
      why_wrong: 'Agent accepted the statement without confirming who else decides.',
      impact: 'Risk of a silent decision maker derailing the appointment.',
      correction: {
        better_script: 'Besides you, who else should be part of this conversation so we can make a smart decision together?',
        principle: 'Always uncover all decision makers before closing.',
        practice_drill: 'Role-play 10 reps of decision-maker discovery in front of a mirror.',
      },
    },
  ],
  call_flow_summary: {
    opening_quality: 'Confident and concise, name + permission + value in 12 seconds.',
    discovery_quality: 'Surfaced timeline and motivation; missed confirming other decision makers.',
    objection_handling_quality: 'Looped three times and reframed to the appointment.',
    closing_quality: 'Used assumptive language with set times and earned a yes.',
    overall_impression: 'Pro-level control with a minor gap in stakeholder discovery.',
  },
  next_steps: {
    primary_focus: 'Decision-maker discovery question',
    practice_drill: 'Record 15 reps of "Who else is involved?" with pauses until it sounds natural.',
    script_to_memorize: 'Who else should be part of this so we can make the best call for you?',
    success_metric: 'Add the question before booking 5 consecutive appointments.',
  },
};

const BAD_ANALYSIS: FeedbackAnalysis = {
  overall_score: 42,
  grade: 'D+',
  dimension_scores: {
    opening: {
      score: 8,
      points_earned: {
        clear_intro: 2,
        used_name: 0,
        asked_permission: 1,
        value_prop: 5,
      },
      explanation:
        'Agent rambled, never used the prospect\'s name, and skipped the permission ask.',
    },
    qualifying: {
      score: 10,
      points_earned: {
        question_count: 4,
        pain_focused: 4,
        listen_ratio: 2,
      },
      questions_asked: ['Would you sell now?', 'Can I stop by?'],
      questions_missed: [
        'How long have you been thinking about moving?',
        'Why now?',
        'Where are you going?',
        'What timeline are you working with?'
      ],
      explanation:
        'No core discovery. Agent pitched before uncovering motivation or timeline.',
    },
    objection_handling: {
      score: 5,
      points_earned: {
        looped_back: 2,
        persistence: 1,
        empathy_reframe: 2,
      },
      objections_encountered: ['Not really thinking about it', 'No thanks'],
      loops_attempted: 1,
      explanation:
        'Gave up after the first pushback and didn\'t loop to the appointment.',
    },
    appointment_setting: {
      score: 6,
      points_earned: {
        assumptive_close: 2,
        specific_times: 2,
        fair_technique: 2,
      },
      appointment_secured: false,
      explanation:
        'No clear time slots or assumptive language; agent defaulted to "call me back."',
    },
    tonality: {
      score: 6,
      points_earned: {
        energy: 2,
        name_usage: 0,
        pacing: 2,
        precision: 2,
      },
      red_flags: ['Apologetic tone', 'Rushed ending'],
      explanation:
        'Shaky energy, zero name usage, and filler words made the call sound uncertain.',
    },
  },
  strengths: [
    {
      what: 'Value hook',
      timestamp: '00:07',
      quote: 'I just wanted to see if you\'d sell now.',
      why_good: 'Even though phrased poorly, the agent at least reached the call objective quickly.',
    },
  ],
  critical_mistakes: [
    {
      issue_type: 'opening',
      timestamp: '00:00',
      what_they_said: 'Um hey there, is this Mr. or Mrs... uh whoever owns the Pinecrest house?',
      why_wrong: 'No name usage and immediately signals uncertainty.',
      impact: 'Prospect questions credibility and wants to exit fast.',
      correction: {
        better_script: 'Hi Sarah, this is Jake Miller with Summit Realty. Did I catch you at a bad time?',
        principle: 'Use confident name + permission before pitching.',
        practice_drill: 'Record the first 15 seconds 20 times until it is smooth.',
      },
    },
    {
      issue_type: 'objection',
      timestamp: '00:14',
      what_they_said: 'Okay, cool, I get it. If you ever change your mind just call me back.',
      why_wrong: 'Accepted the first objection and ceded control.',
      impact: 'No loop attempt, prospect happily stays "not interested."',
      correction: {
        better_script: 'Totally hear you. What\'s holding you back from even looking at your options?',
        principle: 'Loop every objection with curiosity before moving on.',
        practice_drill: 'Role-play 3 objection loops in a row without giving up.',
      },
    },
  ],
  call_flow_summary: {
    opening_quality: 'Uncertain opening with no name or permission made the call feel like a robocall.',
    discovery_quality: 'Zero motivation uncovered; the agent went straight to the close.',
    objection_handling_quality: 'Quit after the first "not interested."',
    closing_quality: 'Asked for a callback instead of setting times.',
    overall_impression: 'Feels like a script read without control or confidence.',
  },
  next_steps: {
    primary_focus: 'Rebuild the Mike Ferry opening word-for-word',
    practice_drill: 'Spend 30 minutes standing while reading the opening until it is confident and under 12 seconds.',
    script_to_memorize: 'Hi [name], this is [your name] with [company]. Is now a bad time?',
    success_metric: 'Deliver the opening flawlessly 20 times before the next live call.',
  },
};

const ANALYSIS_MAP: Record<DummyTranscriptType, FeedbackAnalysis> = {
  GOOD: GOOD_ANALYSIS,
  BAD: BAD_ANALYSIS,
};

export const getDummyFeedbackAnalysis = (type: DummyTranscriptType): FeedbackAnalysis => {
  return ANALYSIS_MAP[type] ?? GOOD_ANALYSIS;
};
